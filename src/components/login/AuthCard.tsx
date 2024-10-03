import LoginForm from "./LoginForm";

const AuthCard = ({ children }: any) => {
  return (
    <div className="w-full p-12 border-solid border-black border rounded-lg max-w-md">
      {children}
    </div>
  );
};
export default AuthCard;
