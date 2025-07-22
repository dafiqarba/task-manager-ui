import { useMatches } from 'react-router'

type BreadcrumbHandle = {
  breadcrumb: string
}

const Breadcrumbs = () => {
  const matches = useMatches()

  const crumbs = matches
    .filter((match): match is typeof match & { handle: BreadcrumbHandle } =>
      Boolean(match.handle && (match.handle as BreadcrumbHandle).breadcrumb)
    )
    .map((match, index, array) => ({
      label: match.handle.breadcrumb,
      isLast: index === array.length - 1,
    }))

  return (
    <nav className="text-sm text-gray-500 px-6 pt-6 pb-3" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex space-x-2">
        {crumbs.map((crumb, idx) => (
          <li key={idx}>
            <div className="flex items-center">
              {idx > 0 && (
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="mx-2 h-4 w-4 text-gray-400"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  />
                </svg>
              )}
              <span
                className={`${
                  crumb.isLast ? 'text-gray-700 font-medium' : 'text-gray-500'
                }`}
              >
                {crumb.label}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
