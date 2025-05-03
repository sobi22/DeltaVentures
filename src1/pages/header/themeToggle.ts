import { WbSunnyOutlined, DarkModeOutlined } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { ThemeContext } from '../../App';
import React, { useState, useEffect } from 'react';

const ThemeModeToggle = () => {
  const { theme, switchTheme } = React.useContext(ThemeContext);
  const [isAnimating, setIsAnimating] = useState(false);

  const iconStyle = {
    fontSize: '1.2rem',
    color: theme === 'dark' ? '#FFD700' : '#4682B4',
    transition: 'transform 0.3s',
    transform: isAnimating ? 'scale(1.2) rotate(360deg)' : 'scale(1)',
  };

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      switchTheme(theme === 'light' ? 'dark' : 'light'); // Ensure toggle based on current theme
      setIsAnimating(false);
    }, 500);
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.ctrlKey && event.key.toLowerCase() === 'm') {
        handleClick();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [theme]); // Added `theme` dependency to ensure it reflects the latest value

  return (
    <Tooltip title={theme === 'light' ? 'Switch to Dark Mode (CTRL + M)' : 'Switch to Light Mode (CTRL + M)'}>
      <IconButton onClick={handleClick} color="inherit">
        {theme === 'dark' ? <WbSunnyOutlined style={iconStyle} /> : <DarkModeOutlined style={iconStyle} />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeModeToggle;
