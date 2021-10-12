import { Theme, createStyles, makeStyles } from '@material-ui/core';

export const SignUpStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      getStartedContainer: {
        textAlign: 'center',
        marginBottom: 70,
      },
      title: {
        fontSize: 40,
        fontWeight: 700,
        color: '#0B1F35',
        padding: 10,
      },
      subTitle: {
        fontSize: 16,
        fontWeight: 400,
        color: '#6D7986',
        width: 572,
        margin: 'auto',
        padding: 10,
      },
      startFlexContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100vw',
      },
      dividerLine: {
        flexGrow: 1,
        backgroundColor: '#6D7986',
        height: 1,
        display: 'inline-block',
        opacity: 0.4,
      },
      dividerText: {
        color: '#6D7986',
        flexGrow: 0,
        opacity: 0.4,
      },
      buttonContainer: {
        padding: 25,
      },
      connectButton: {
        width: 450,
        height: 60,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid rgba(109, 121, 134, 0.3)',
        borderRadius: 6,
        boxSizing: 'border-box',
        margin: 'auto',
      },
      logoImage: {
        margin: 'auto',
        marginLeft: -10,
      },
      connectButtonText: {
        fontWeight: 700,
        fontSize: 14,
        margin: 'auto',
        color: '#0B1F35',
      },
      arrow: {
        margin: 'auto',
      },
    }),
  {
    index: 1,
  },
);
