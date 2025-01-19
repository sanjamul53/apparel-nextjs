import { Users } from "@/apiServer/models/user.model"


export const get_one_user_by_googleId = async (google_id: string) => {

  const targetUser = await Users.findOne({
    google_id
  });

  if(!targetUser) return null;

  return targetUser;

}