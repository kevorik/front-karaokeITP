import { useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../users.store";

type UserCreateProps = {
  user: any;
  isSuccess: boolean;
  id: string | undefined;
};
export const UserCreateForm = (props: UserCreateProps): any => {
  const [createUsers, {}] = useCreateUserMutation();
  const navigate = useNavigate();
  const initialFormValues = {
    nickName: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    roleId: "",
    // birthDay: "",
  };

  const onSubmit = async (data: any) => {
    try {
      const newUsers = new FormData();

      newUsers.append("nickName", data.nickName);
      newUsers.append("firstName", data.firstName);
      newUsers.append("lastName", data.lastName);
      newUsers.append("email", data.email);
      newUsers.append("gender", data.gender);
      newUsers.append("roleId", data.roleId);
      newUsers.append("birthDay", data.birthDay);

      await createUsers(newUsers).unwrap();
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    initialFormValues,
    onSubmit,
  };
};

export default UserCreateForm;
