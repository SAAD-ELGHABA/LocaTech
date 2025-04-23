import logo from '../assets/Location.png';
export default function SplashScreen() {
  const title = "LocaTech";

  return (
    <div className="splash-screen">
      <div className="logo-container">
        <div className="title-wrapper flex items-end h-screen">
          <img 
            src={'LocaTech-icon-removebg-preview.png'}
            alt="Logo" 
            className="logo-image"
          />
          <h1 className="animated-title ">
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