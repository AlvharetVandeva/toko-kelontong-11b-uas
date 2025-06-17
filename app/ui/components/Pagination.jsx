'use client';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Pagination(props) {

    const { path, page, totalPages } = props;
    const searchParams = useSearchParams();
    const router = useRouter();

    const goToPage = (newPage) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', newPage);
      router.push(`/${path}?${params.toString()}`);
    };

    return (
        <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px text-sm">
                <li>
                    <button
                    onClick={() => goToPage(page - 1)}
                    disabled={page === 1}
                    className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                    >
                    Previous
                    </button>
                </li>

                {[...Array(totalPages).keys()].map(i => {
                    const pageNum = i + 1;
                    const isActive = pageNum === page;
                    return (
                    <li key={pageNum}>
                        <button
                        onClick={() => goToPage(pageNum)}
                        className={`flex items-center justify-center px-3 h-8 leading-tight border ${
                            isActive
                            ? 'text-blue-600 border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
                            : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                        }`}
                        >
                        {pageNum}
                        </button>
                    </li>
                    );
                })}

                <li>
                    <button
                    onClick={() => goToPage(page + 1)}
                    disabled={page >= totalPages}
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                    >
                    Next
                    </button>
                </li>
            </ul>
        </nav>
    )
}