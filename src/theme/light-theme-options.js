// Colors
const neutral = {
    100: '#FFFFFF',
    200: '#F3F4F5',
    300: '#D1D5DB',
    400: '#758590',
    500: '#6B7280',
    600: '#4B5864',
    700: '#374151',
    800: '#1F2937',
    900: '#212B36',
    1000: '#000000',
    1100: '#FBFBFB',
    1200: '#4B566B',
    1300: '#EF78224D',
    1400: 'rgba(255, 255, 255, 0.8)',
    1500: 'rgba(239, 120, 34, 0.6)',
    1600: '#FFEBDD',
    1700: '#fff5cf',
}

const table = {
    background: '#F8F8FA',
    textColor: '#031C3A',
}
const paperBoxShadow = '#E5EAF1'
const footerTopBg = '#3e4655'
const footerTopBgColor = '#00000050'
const footerCenterBg = '#2f3645'
const footerMiddleBg = '#343c4d'

const background = {
    default: '#FFFFFF',
    paper: '#FFFFFF',
    buttonBackground: 'rgba(82, 102, 208, 0.05)',
    profileBackground: '#FBFBFB',
}
const newsletterBG = '#2287FD'

const divider = '#E6E8F0'
// main: '#EF7822',
// secondary main: '#ff903f',
const primary = {
    main: '#EF7822',
    light: '#ff6700',
    dark: '#a3460a',
    contrastText: '#FFFFFF',
    midPrimary: ' #FFF5ED',
    overLay: '#000000',
}
const secondary = {
    main: '#934916',
    light: '#db5c00',
    dark: '#a2684c',
    contrastText: '#FFFFFF',
}
const whiteContainer = {
    main: '#F9FAFC',
    light: '#EF7822',
    dark: '#ff903f',
    contrastText: '#EF7822',
}
const whiteText = {
    main: '#FFFFF',
}
const success = {
    main: '#00AB11',
    light: '#00AB11',
    dark: '#2e7d32',
    contrastText: '#FFFFFF',
}

const info = {
    main: '#2196F3',
    light: '#64B6F7',
    dark: '#0B79D0',
    contrastText: '#FFFFFF',
}

const warning = {
    main: '#FFB020',
    light: '#FFBF4C',
    dark: '#B27B16',
    contrastText: '#FFFFFF',
}

const error = {
    main: '#FF686A',
    light: '#DA6868',
    dark: '#922E2E',
    contrastText: '#FFFFFF',
    info: '#FCECD3',
    back: '#FFE1E2',
    whiteText: '#FFFFFF',
    pureRed: '#FF4B55',
}
const customColor = {
    one: '#FF5E00',
    two: '#2B95FF',
    three: '#FF686A',
    four: '#5266D0',
    five: '#FFE1E2',
    six: '#414141',
    seven: '#2C1D13',
}

const text = {
    primary: '#121828',
    secondary: '#65748B',
    custom: '#242424',
    disabled: 'rgba(55, 65, 81, 0.48)',
}

export const lightThemeOptions = {
    typography: {
        allVariants: {
            fontFamily: 'Public Sans',
            textTransform: 'none',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    color: '#FFFFFF',
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    backgroundColor: neutral[500],
                    color: '#FFFFFF',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    '&.MuiChip-filledDefault': {
                        backgroundColor: neutral[200],
                        '& .MuiChip-deleteIcon': {
                            color: neutral[400],
                        },
                    },
                    '&.MuiChip-outlinedDefault': {
                        '& .MuiChip-deleteIcon': {
                            color: neutral[300],
                        },
                    },
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    '&::placeholder': {
                        opacity: 1,
                        color: text.secondary,
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    borderColor: divider,
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    borderColor: divider,
                    borderStyle: 'solid',
                    borderWidth: 1,
                },
            },
        },
        MuiPopover: {
            styleOverrides: {
                paper: {
                    borderColor: divider,
                    borderStyle: 'solid',
                    borderWidth: 1,
                },
            },
        },
        MuiSwitch: {
            styleOverrides: {
                switchBase: {
                    color: neutral[500],
                },
                track: {
                    backgroundColor: neutral[400],
                    opacity: 1,
                },
            },
        },
        // MuiTable: {
        //   styleOverrides: {
        //     root: {
        //       boxShadow: `3px 6px 26px 5px rgba(0,0,0,0.34) !important`,
        //     },
        //   },
        // },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    borderBottom: `2px solid ${neutral[200]}`,
                    // borderRadius: '20%',
                    borderCollapse: `separate !important`,
                    // boxShadow: `0px 2px 3px -1px rgba(0,0,0,0.36)`,
                    '&:last-child td, &:last-child th': { border: 0 },
                    whiteSpace: 'nowrap',
                },
            },
        },
        //boxShadow: `0 3px 10px rgb(0 0 0 / 0.2)`,

        MuiTableCell: {
            styleOverrides: {
                root: {
                    //backgroundColor: 'red',
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: neutral[200],
                    '.MuiTableCell-root': {
                        color: neutral[700],

                        // boxShadow: `0px 2px 3px -1px rgba(0,0,0,0.36)`,
                    },
                },
            },
        },
    },

    palette: {
        action: {
            active: neutral[500],
            focus: 'rgba(55, 65, 81, 0.12)',
            hover: '#ff903f',
            selected: 'rgba(55, 65, 81, 0.08)',
            disabledBackground: 'rgba(55, 65, 81, 0.12)',
            disabled: 'rgba(55, 65, 81, 0.26)',
            cardBackground: 'rgba(65, 83, 179, 0.1)',
        },
        paperBoxShadow,
        background,
        divider,
        error,
        info,
        customColor,
        mode: 'light',
        neutral,
        table,
        primary,
        secondary,
        success,
        text,
        warning,
        whiteContainer,
        footerTopBg,
        footerCenterBg,
        footerMiddleBg,
        newsletterBG,
        footerTopBgColor,
    },

    shadows: [
        'none',
        '0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)',
        '0px 1px 2px rgba(100, 116, 139, 0.12)',
        '0px 1px 4px rgba(100, 116, 139, 0.12)',
        '0px 1px 5px rgba(100, 116, 139, 0.12)',
        '0px 1px 6px rgba(100, 116, 139, 0.12)',
        '0px 2px 6px rgba(100, 116, 139, 0.12)',
        '0px 3px 6px rgba(100, 116, 139, 0.12)',
        '0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)',
        '0px 5px 12px rgba(100, 116, 139, 0.12)',
        '0px 5px 14px rgba(100, 116, 139, 0.12)',
        '0px 5px 15px rgba(100, 116, 139, 0.12)',
        '0px 6px 15px rgba(100, 116, 139, 0.12)',
        '0px 7px 15px rgba(100, 116, 139, 0.12)',
        '0px 8px 15px rgba(100, 116, 139, 0.12)',
        '0px 9px 15px rgba(100, 116, 139, 0.12)',
        '0px 10px 15px rgba(100, 116, 139, 0.12)',
        '0px 12px 22px -8px rgba(100, 116, 139, 0.25)',
        '0px 13px 22px -8px rgba(100, 116, 139, 0.25)',
        '0px 14px 24px -8px rgba(100, 116, 139, 0.25)',
        '0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)',
        '0px 25px 50px rgba(100, 116, 139, 0.25)',
        '0px 25px 50px rgba(100, 116, 139, 0.25)',
        '0px 25px 50px rgba(100, 116, 139, 0.25)',
        '0px 25px 50px rgba(100, 116, 139, 0.25)',
    ],
}
