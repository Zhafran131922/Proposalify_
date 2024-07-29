import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";


export default function profile() {
    const [user, setUser]:any = useState();

	const getUser = async () => {
		try {
			const url = `http://localhost:5000/auth/login/success`;
			const { data } = await axios.get(url, { withCredentials: true });
			setUser(data.user._json);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getUser();
	}, []);
  return (
    <>
    <h1>{user?.name}</h1>
    <h2>{user?.email}</h2>
    <Image
      src={user?.picture}
      width={500}
      height={500}
      alt="Picture of the author"
    />
    </>
  )
}
