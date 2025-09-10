import { useAuth } from "../contexts/authContext"
import { getBasePath } from "../utils/helpers"

export const useBasePath = () => {
  const { user } = useAuth()
  return getBasePath(user?.role_id);
}