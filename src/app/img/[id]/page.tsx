import { getImage } from "~/server/queries";

export default async function PhotoModal(props: { params: { id: string } }) {
  // Do not destructure `params` in the parameter list!
  const photoId = props.params.id;
  const idAsNumber = Number(photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");
  const image = await getImage(idAsNumber);
  return (
    <div>
      <img src={image.url} className="w-full h-full object-cover" />
    </div>
  );
}