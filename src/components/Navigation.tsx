import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {Button} from '@mui/material';
import Link from './Link';
import { useTranslation } from 'react-i18next';
import {ICategoryMember} from "../models/ICategoryPages";
import {useCategoryPages} from "../hooks/CategoryPagesFetch"
import {EventHandler, useState} from "react";
import Container from "@mui/material/Container";


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    input:'onInput',
    name:'input',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    rows:'IRow'
}));

export default function SearchAppBar() {
    const { t, i18n } = useTranslation('main', { keyPrefix: 'nav' })

    const swapLanguage = () => {
        if (i18n.language === 'en') {
            i18n.changeLanguage('ru')
        } else {
            i18n.changeLanguage('en')
        }
        console.log(i18n.language)
    }

    const swapLanguageMenuWrapper = () => {
        swapLanguage()
        handleCloseNavMenu()
    }

    const pagess = [[t('home'), '/writers-of-belarus'],
    [t('writers'), '/writers-of-belarus/writers'],
    [t('about'), '/writers-of-belarus/about']]

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleCloseNavMenuId = (id: number) => {
        setAnchorElNav(null);
    };

    //Input state
    const [name, setName] = useState("")

    //Updating and check input
    const updateInput = (event: any) => {
        setName(event.target.value)
    }
    const UpdateOutput = () => {
        const {pages, error, loading} = useCategoryPages();
        let data: ICategoryMember[];

        if (pages && !error && loading) {
            pages.map((elem) =>
                data.push(elem)
            )
        }
        let tmp: ICategoryMember[] = []

        pages?.forEach((elem) => {
            let index = 0
            for (let i = 0; i < elem.title.length; i++) {
                if (elem.title[i] == ' ') {
                    index = i
                    break;
                }
            }
            if (elem.title.toLowerCase() == name.toLowerCase() ||
                elem.title.toLowerCase().substring(0, index) == name.toLowerCase() ||
                elem.title.toLowerCase().substring(0, 5) == name.toLowerCase().substring(0, 5) && name.length <= 5 ||
                elem.title.toLowerCase().substring(0, 4) == name.toLowerCase().substring(0, 4) && name.length <= 4 ||
                elem.title.toLowerCase().substring(0, 3) == name.toLowerCase().substring(0, 3) && name.length <= 3 ||
                elem.title.toLowerCase().substring(0, 2) == name.toLowerCase().substring(0, 2) && name.length <= 2 ||
                elem.title.toLowerCase().substring(0, 1) == name.toLowerCase().substring(0, 1) && name.length <= 1 ) {
                tmp.push({pageid: elem.pageid, title: elem.title, ns: elem.ns})
            }
        })

        if (tmp! != null) {
            console.log(tmp)
            return (
                //TODO()
               <Container style={{
                   width:'16%',
                   marginLeft:'60%',
                   position:'absolute',
                   textAlign:"left",
                   paddingRight:'1px',
                   paddingLeft:'1px',
                   WebkitBoxShadow:'5px 6px 200px grey'
               }}>
                   {tmp.map((it) =>
                       <Box
                           onClick={() => window.open(`/writers-of-belarus/writer/${it.title}`)}
                           style={{
                               textAlign: 'center',
                               fontStyle: 'oblique',
                               fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                               fontSize: '1.4em',
                               cursor: 'pointer',
                               color: 'rgba(255, 255, 255, 100)',
                               backgroundColor: 'rgba(0, 0, 0, 0.87)',
                               borderBlock:'ActiveBorder',
                               padding:'2px'
                           }}
                       >
                           <Typography textAlign={'left'}>
                                {it.title}
                           </Typography>
                       </Box>)}
               </Container>
            )
        } else  {
            return (<></>)
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Box
                        sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pagess.map((page) => (
                                <MenuItem key={page[0]} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        <Link href={`${page[1]}`}>
                                            {page[0]}
                                        </Link>
                                    </Typography>
                                </MenuItem>
                            ))}
                            {
                                <MenuItem key={4} onClick={swapLanguageMenuWrapper}>

                                    <Typography
                                        textAlign="center"
                                    >
                                        {t('changeLng')}
                                    </Typography>
                                </MenuItem>
                            }
                        </Menu>
                    </Box>
                    <Typography
                        variant="body1"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        <Link
                            variant="h6"
                            href="/writers-of-belarus/"
                            sx={{
                                marginRight: 4
                            }}
                        >
                            {t('title')}
                        </Link>
                        <Link
                            href="/writers-of-belarus/about"
                            sx={{
                                marginRight: 2
                            }}
                        >
                            {t('about')}
                        </Link>
                        <Link
                            href="/writers-of-belarus/writers"
                            sx={{
                                marginRight: 2
                            }}
                        >
                            {t('writers')}
                        </Link>
                        <Button
                            variant="text"
                            color="inherit"
                            disableRipple
                            onClick={swapLanguage}
                            sx={{
                                padding: '0',
                                fontSize: '1rem',
                                textTransform: 'none'
                            }}
                        >
                            {t('changeLng')}
                        </Button>
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            id={'input'}
                            onChange={updateInput}
                        />
                    </Search>
                </Toolbar>
            </AppBar>
            <Container style={{
                marginLeft:'opx',
                marginRight:'inherit',
            }}>
                <UpdateOutput/>
            </Container>
        </Box>
    );
}
