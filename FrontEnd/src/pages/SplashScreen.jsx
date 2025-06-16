import logo from '../assets/Location.png';
export default function SplashScreen() {
  const title = "LocaTech";

  return (
    <div className="splash-screen">
      <div className="logo-container">
        <div className="title-wrapper flex items-end h-screen space-x-2">
          <img 
            src={'/LocaTech-icon-removebg-preview.png'}
            alt="Logo" 
            className="w-11 h-11 lg:w-18 lg:h-18"
          />
          <h1 className="text-5xl lg:text-7xl">
            {title.split("").map((char, index) => (
              <span
                key={index}
                className="letter"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  color: index < 4 ? '#F44336' : '#F44336'
                }}
              >
                {char}
              </span>
            ))}
          </h1>
        </div>
      </div>
    </div>
  );
}