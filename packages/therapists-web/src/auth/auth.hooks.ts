import { useHistory } from "react-router-dom";

export const useAuth = () => {
  const history = useHistory()

  const signOut = () => {

  }

  return {
    signOut,
  }
}

