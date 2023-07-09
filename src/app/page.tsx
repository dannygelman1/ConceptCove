import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center space-y-4 p-8 bg-gray-600">
      <h1 className="font-bold text-2xl">Concept Cove</h1>
      <table className="border-separate border-spacing-4">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Artist</th>
            <th>Link</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-4">
              <img src="image-url" alt="Image" />
            </td>
            <td className="p-4">Artwork Name</td>
            <td className="p-4">Artist Name</td>
            <td className="p-4">
              <a href="link-url">Link</a>
            </td>
            <td className="p-4">Tag 1, Tag 2, Tag 3</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
