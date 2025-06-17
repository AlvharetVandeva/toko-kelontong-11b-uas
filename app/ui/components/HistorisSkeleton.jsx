export const TransactionSkeleton = () => {
  // Membuat array dengan 5 item untuk menampilkan 5 baris skeleton
  const skeletonRows = Array(5).fill(0);
  
  return (
    <div className="bg-white border rounded-lg overflow-hidden animate-pulse">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tanggal
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Item
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Jumlah
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {skeletonRows.map((_, index) => (
            <tr key={`skeleton-${index}`}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-3 w-16 bg-gray-200 rounded"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-3 w-24 bg-gray-200 rounded"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-3 w-32 bg-gray-200 rounded"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-3 w-28 bg-gray-200 rounded"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-3 w-10 bg-gray-200 rounded"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-3 w-20 bg-gray-200 rounded"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};