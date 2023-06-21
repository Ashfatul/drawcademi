/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../utility/firebase.config";
import axiosFetch from "../utility/axios";
import toastr from "toastr";
export const AuthContext = createContext(null);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      axiosFetch
        .get(`/user-role/${user?.uid}`)
        .then((res) => setUserRole(res.data))
        .then(() => {
        })
        .catch((e) => console.log(e));
    }
  }, [user]);

  const createNewUser = async (data) => {
    setLoading(true);

    const email = data.email;
    const password = data.password;
    const photo = data.photo;
    const name = data.name;
    const gender = data.gender;
    const phone = data.phone;
    const address = data.address;

    return await createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        toastr.success("Account Created Successfully");
        const user = res.user;

        await updateProfile(user, {
          displayName: name,
          photoURL: photo,
        });

        const userData = {
          name,
          email,
          photo,
          gender,
          phone,
          address,
          authID: user.uid,
          role: "student",
        };

        axiosFetch
          .post("/add-user", userData)
          .then((res) => {
            return res.data;
          })
          .catch((e) => {
            toastr.error("Failed To Store User Data");
            console.log(e);
          });
      })
      .then(() => {
        return "success";
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.message);
        toastr.error("Failed To Create User", e.message);
      });
  };

  const logIn = async (data) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        toastr.success("Login Successful");
      })
      .then(() => {
        return "success";
      })
      .catch((e) => {
        console.log(e);
        toastr.error(e.message);
        setLoading(false);
      });
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    return signInWithPopup(auth, provider)
      .then((data) => {
        toastr.success("Login Successful");
        axiosFetch.get(`/user/${data.user.uid}`).then((res) => {
          const userData = res.data;
          if (!userData || Object.keys(userData).length === 0) {
            const newData = {
              name: data.user.displayName,
              email: data.user.email,
              photo: data.user.photoURL,
              gender: null,
              phone: data.user.phoneNumber,
              address: null,
              authID: data.user.uid,
              role: "student",
            };
            axiosFetch
              .post("/add-user", newData)
              .then((res) => {
                return res.data;
              })
              .catch((e) => {
                toastr.error("Failed To Store User Data");
                console.log(e);
              });
          }
        });
      })
      .then(() => {
        return "success";
      })
      .catch((e) => {
        console.log(e);
        toastr.error(e.message);
        setLoading(false);
      });
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const authData = {
    user,
    logIn,
    loginWithGoogle,
    createNewUser,
    logOut,
    userRole,
    loading,
  };

  return (
    <AuthContext.Provider value={authData}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
