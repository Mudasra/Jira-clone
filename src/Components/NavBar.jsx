import { Link, useParams } from 'react-router-dom';
import useAppStore from '../store/useAppStore';

function Navbar() {
  const theme = useAppStore(s => s.theme);
  const setTheme = useAppStore(s => s.setTheme);

  // If you are on a project route, projectId will exist
  const { projectId } = useParams();

  return (
    <div className="navbar bg-base-200 px-4">
      {/* Left */}
      <div className="flex-1 gap-2">
        <Link to="/" className="btn btn-ghost text-xl">
          Jira Clone
        </Link>
      </div>

      {/* Right */}
      <div className="flex-none gap-2">

        {projectId && (
          <>
            <Link
              to={`/projects/${projectId}/board`}
              className="btn btn-ghost btn-sm"
            >
              Board
            </Link>

            <Link
              to={`/projects/${projectId}/backlog`}
              className="btn btn-ghost btn-sm"
            >
              Backlog
            </Link>

            <Link
              to={`/projects/${projectId}/settings`}
              className="btn btn-ghost btn-sm"
            >
              Settings
            </Link>
          </>
        )}

        <Link to="/" className="btn btn-ghost btn-sm">
          Projects
        </Link>

        <button
          className="btn btn-sm"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
