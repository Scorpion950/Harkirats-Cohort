
interface User{
    name: string;
    age: number;
    id: string;
    email: string;
    password: string;
};

type UpdateProps = Pick < User, 'name' | 'age'| 'email'>;

const displayUserProfile = (user: UpdateProps) =>{//hit the db to update the user

    console.log(`Name: ${user.name}, Email: ${user.email}`);

}
