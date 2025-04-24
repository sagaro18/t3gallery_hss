import { clerkClient } from "@clerk/nextjs/server";
import { deleteImage, getImage } from "~/server/queries";
import { Button } from "./ui/button";

export default async function FullPageImageView(props: { id: number }) {
  // 1. Fetch the image record (which now includes image.userId)
  const image = await getImage(props.id);

  // 2. Initialize the Clerk client and grab the users API
  const client = await clerkClient();
  const uploaderInfo = await client.users.getUser(image.userId);

  return (
    <div className="flex w-full h-full min-w-0">
      <div className="flex-shrink flex justify-center items-center">
        <img src={image.url} className="flex-shrink object-contain" />
      </div>
      <div className="flex w-48 flex-shrink-0 flex-col gap-2 border-l">
        <div className="border-b text-lg text-center p-2">{image.name}</div>
        <div className="p-2 text-center">
          <span className="font-semibold">Uploaded By:</span>
          <div>{uploaderInfo.fullName}</div>
        </div>
        <div className="p-2 text-center">
          <span className="font-semibold">Created On:</span>
          <div>{new Date(image.createdAt).toLocaleString()}</div>
        </div>

        <div className = "p-2 text-center">
          <form
            action = {async () => {
              "use server";
              await deleteImage(props.id);
            }}>
            <Button type = "submit" variant = "destructive">
              Delete
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
