import { styled } from '@mui/material/styles';
import Button,{ ButtonProps } from '@mui/material/Button';
import { purple } from '@mui/material/colors';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: '#009999',
      '&:hover': {
        backgroundColor: '#004d4d',
      },
}));
export default ColorButton;