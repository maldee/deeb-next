import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

const page = async () =>{
    const session = await getServerSession(authOptions);
    if(session?.user){
        return <h2>Admin page welcome back {session?.user.name}</h2>
    }

    return <h2>Please login to see admin page</h2>;
};

export default page;