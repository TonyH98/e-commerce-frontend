import "./Darkmode.css"

function DarkMode(){
    <div className="toggle-theme-wrapper">
        <span>☀️</span>
        <label className="toggle-theme" htmlFor="checkbox">
            <input
            type="checkbox"
            id="checkbox"
            />
            <div className="slider round"></div>
        </label>
        <span>🌙</span>
    </div>
}

export default DarkMode