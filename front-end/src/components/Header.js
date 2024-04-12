import reactLogo from './reactLogo.webp';

export function Header() {
    return (
        // Logo from: https://www.iconfinder.com/icons/1174949/js_react_js_logo_react_react_native_icon
        <div className="header">
            <img src={reactLogo} alt="React.js Logo"></img>
            <div>
                <ul>
                    <li><a className='menu-item' href="/">Product List</a></li>
                    <li><a className='menu-item' href="/">Product List</a></li>
                    <li><a className='menu-item' href="/">Product List</a></li>
                </ul>
            </div>
        </div>
    );
};