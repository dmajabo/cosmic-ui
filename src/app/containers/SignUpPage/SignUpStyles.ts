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
        textAlign: 'center',
        padding: 10,
        marginBottom: 10,
      },
      subTitle: {
        fontSize: 16,
        fontWeight: 400,
        color: '#6D7986',
        width: 804,
        margin: 'auto',
        textAlign: 'center',
        padding: 10,
        marginBottom: 20,
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
      tryDemoTitle: {
        fontSize: 34,
        fontWeight: 700,
        padding: 15,
      },
      tryDemoSubtitle: {
        fontWeight: 400,
        fontSize: 20,
        padding: 15,
        width: 405,
        marginBottom: 30,
      },
      tryDemoButton: {
        fontSize: 12,
        fontWeight: 700,
        border: '1px solid #FFFFFF',
        width: 198,
        height: 60,
        paddingTop: 20,
        paddingLeft: 50,
        borderRadius: 6,
        cursor: 'pointer',
        marginLeft: 10,
      },
      whiteArrow: {
        marginLeft: 10,
      },
      edgeBoxContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
      },
      edgeContainer: {
        backgroundColor: '#FBFCFE',
        border: '1px solid #CBD2DC',
        boxSizing: 'border-box',
        borderRadius: 6,
        width: 364,
        height: 239,
        display: 'inline-block',
        margin: 15,
        padding: 20,
      },
      edgeBoxImage: {
        width: 45,
        height: 40,
      },
      edgeBoxTitle: {
        fontSize: 22,
        fontWeight: 700,
        marginLeft: 20,
        color: '#05143A',
        display: 'inline-block',
      },
      edgeBoxContent: {
        paddingTop: 30,
        color: '#848DA3',
        fontSize: 14,
        fontWeight: 400,
      },
      edgeConnectButton: {
        border: '1px solid #CBD2DC',
        backgroundColor: '#FFFFFF',
        width: 142,
        height: 40,
        color: '#05143A',
        fontSize: 12,
        fontWeight: 700,
        cursor: 'pointer',
        borderRadius: 6,
        paddingTop: 10,
        paddingLeft: 30,
        marginTop: 20,
        marginLeft: 170,
      },
      newEdgeButton: {
        border: '1px dashed #CBD2DC',
        boxSizing: 'border-box',
        borderRadius: 6,
        width: 364,
        height: 239,
        display: 'inline-block',
        margin: 15,
        paddingTop: 110,
        paddingLeft: 120,
        fontSize: 12,
        fontWeight: 700,
        cursor: 'pointer',
      },
      flexContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingRight: 15,
        paddingLeft: 15,
        marginTop: 30,
      },
      startButton: {
        height: 60,
        width: 198,
        fontSize: 12,
        fontWeight: 700,
        borderRadius: 6,
        cursor: 'pointer',
        border: 'none',
      },
      skipSetupButton: {
        height: 60,
        width: 198,
        fontSize: 12,
        fontWeight: 700,
        border: '1px solid #CBD2DC',
        textAlign: 'center',
        borderRadius: 6,
        paddingTop: 20,
        paddingLeft: 0,
        marginRight: 15,
        cursor: 'pointer',
      },
      skipSetupText: {
        color: '#848DA3',
        fontWeight: 400,
        fontSize: 14,
        textAlign: 'center',
        padding: 10,
      },
      topBar: {
        backgroundColor: '#F3F6FC',
        height: '80px',
        width: '70%',
        padding: 25,
        paddingRight: 40,
        zIndex: 3,
        position: 'fixed',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      topBarText: {
        fontSize: 18,
        fontWeight: 700,
        color: '#05143A',
        paddingRight: 20,
      },
      topBarflexContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      connectFormContainer: {
        marginTop: 80,
        margin: 'auto',
        marginBottom: 50,
      },
      titleContainer: {
        marginTop: 50,
        marginLeft: '16vw',
      },
      titleImg: {
        height: 35,
        marginRight: 20,
      },
      grayBorderBox: {
        backgroundColor: '#FBFCFE',
        border: '1px solid #CBD2DC',
        boxSizing: 'border-box',
        borderRadius: 6,
        padding: 30,
        marginTop: 30,
        width: '60vw',
      },
      connectFlexContainer: {
        display: 'flex',
        justifyContent: 'start',
      },
      stepCountBox: {
        width: 40,
        height: 40,
        backgroundColor: '#437FEC',
        borderRadius: 6,
        fontSize: 18,
        fontWeight: 700,
        color: 'white',
        paddingLeft: 16,
        paddingTop: 7,
        marginRight: 30,
      },
      stepTitle: {
        fontSize: 18,
        fontWeight: 700,
        paddingTop: 10,
        paddingBottom: 25,
      },
      dropdownLabel: {
        fontWeight: 700,
        fontSize: 12,
        color: '#848DA3',
      },
      checkbox: {
        width: 20,
        height: 20,
        marginRight: 10,
      },
      radioTitle: {
        fontSize: 16,
        fontWeight: 500,
        color: '#05143A',
        marginTop: 10,
      },
      stepSubtitleContainer: {
        marginTop: -10,
      },
      stepSubtitleText: {
        color: '#848DA3',
        fontSize: 14,
        fontWeight: 400,
      },
      codeText: {
        fontWeight: 500,
        fontSize: 12,
        color: '#05143A',
        backgroundColor: '#F3F6FC',
        width: 60,
        padding: 5,
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 6,
      },
      codeBox: {
        width: '115%',
        backgroundColor: '#EFF3FB',
        borderRadius: 6,
        marginTop: 20,
        padding: 20,
      },
      copyIcon: {
        float: 'right',
      },
      terraformHighlightedCodeText: {
        fontWeight: 400,
        fontSize: 16,
        color: '#437FEC',
        backgroundColor: 'rgb(67,127,236,0.2)',
        width: 60,
        padding: 3,
        borderRadius: 6,
      },
      terraformCodeText: {
        fontSize: 16,
        fontWeight: 400,
        color: '#05143A',
      },
      connectSourceFormButton: {
        height: 60,
        width: 198,
        fontSize: 12,
        fontWeight: 700,
        borderRadius: 6,
        cursor: 'pointer',
        border: 'none',
        background: 'linear-gradient(97.14deg, #F8B40A 6.1%, #F0CA23 55.57%)',
      },
      connectedContainer: {
        marginTop: 30,
      },
      edgeBoxConnectedText: {
        color: '#52984E',
        fontWeight: 700,
        fontSize: 12,
      },
      connectedTick: {
        marginRight: 10,
      },
      editButton: {
        border: '1px solid #CBD2DC',
        backgroundColor: '#FFFFFF',
        width: 142,
        height: 40,
        color: '#05143A',
        fontSize: 12,
        fontWeight: 700,
        cursor: 'pointer',
        borderRadius: 6,
        paddingTop: 10,
        paddingLeft: 40,
        marginTop: -30,
        marginLeft: 170,
      },
      formInput: {
        width: '100%',
        height: 60,
        borderRadius: 6,
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 500,
        border: '1px solid rgba(109, 121, 134, 0.3)',
      },
      showPassword: {
        position: 'relative',
        marginTop: -53,
        marginLeft: '95%',
        cursor: 'pointer',
        marginBottom: 20,
      },
      showPasswordIcon: {
        height: 20,
      },
      subStepCountBox: {
        width: 36,
        height: 36,
        backgroundColor: '#FBFCFE',
        borderRadius: 6,
        fontSize: 18,
        fontWeight: 700,
        paddingLeft: 6,
        paddingTop: 4,
        marginRight: 20,
        border: '1px solid #CBD2DC',
      },
      subStepTitle: {
        fontWeight: 500,
        fontSize: 14,
        color: '#848DA3',
        paddingTop: 7,
        marginBottom: 10,
      },
      bold: {
        color: '#05143A',
      },
      descImg: {
        width: '100%',
        display: 'block',
        marginBottom: 10,
      },
      focusText: {
        backgroundColor: '#F3F6FC',
        borderRadius: 6,
        padding: 5,
        fontWeight: 500,
        fontSize: 12,
        color: '#05143A',
        marginLeft: 10,
        marginRight: 10,
      },
      newEdgeBox: {
        backgroundColor: '#FBFCFE',
        border: '1px solid #CBD2DC',
        boxSizing: 'border-box',
        borderRadius: 6,
        width: 364,
        height: 120,
        display: 'inline-block',
        margin: 15,
        paddingTop: 40,
        textAlign: 'center',
        cursor: 'pointer',
      },
      newEdgeHighlightedBox: {
        backgroundColor: '#FBFCFE',
        border: '1px solid #437FEC',
        boxSizing: 'border-box',
        borderRadius: 6,
        width: 364,
        height: 120,
        display: 'inline-block',
        margin: 15,
        paddingTop: 40,
        textAlign: 'center',
        cursor: 'pointer',
      },
      newEdgeTitleText: {
        fontWeight: 700,
        fontSize: 22,
        color: '#05143A',
      },
      newEdgeIcon: {
        height: 24,
        marginRight: 20,
      },
      buttonText: {
        fontSize: 12,
        fontWeight: 700,
        color: '#05143A',
      },
      newEdgePadding: {
        paddingLeft: '10vw',
        paddingRight: '10vw',
        marginBottom: '10vh',
      },
      endFlexContainer: {
        display: 'flex',
        justifyContent: 'end',
      },
      formTextBox: {
        width: '100%',
        height: 240,
        borderRadius: 6,
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 500,
        padding: 20,
        resize: 'none',
        border: '1px solid rgba(109, 121, 134, 0.3)',
      },
    }),
  {
    index: 1,
  },
);
