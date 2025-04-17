import Link from "next/link";

const mockUrls = [
  "https://ys97tle9ee.ufs.sh/f/BHCOcEU0CItWsdAVRKfPvlOTAg21RpmuwIQe8JrMiZCXdczq",
  "https://ys97tle9ee.ufs.sh/f/BHCOcEU0CItWo5aPWKSq19i3NnjT2zvFQoAk5bKSRcEX4MHD",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {mockImages.map((image) => (
          <div key={image.id} className="w-1/2 p-4">
            <img src={image.url} alt={`Image ${image.id}`} />
          </div>
        ))}
      </div>
      Hello (gallery in progress)
    </main>
  );
}