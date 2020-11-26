import MenuIcon from './icons/MenuIcon'

const Menu = ({ options = [], optionHandle = () => {} }) => {
  const [isActive, setActive] = React.useState(false)
  const handleDropdownClick = () => setActive(!isActive)

  return (
    <div className="m-menu-container">
      <div>
        <button className="m-menu-btn" aria-expanded="false" onClick={handleDropdownClick}>
          <MenuIcon />
        </button>
      </div>

      <div
        className={`m-menu-options ${
          isActive ? 'block' : 'hidden'
        }`}
      >
        {options.map((option, i) => {
          return (
            <div className="bg-white shadow-xs" key={i}>
              <div className="py-1">
                <div
                  className="block px-4 py-2 text-gray-700"
                  onClick={optionHandle}
                >
                  {typeof option === 'function' ? option() : option}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Menu;
