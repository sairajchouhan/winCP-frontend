import { makeStyles } from '@material-ui/core/styles';

export const useAuthFormStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: theme.palette.primary,
    width: '100%',
    height: '100%',
    background: 'rgba(255,255,225,0.4)',
  },
  field: {
    marginBottom: '20px',
  },
}));
