import React, { FC, Fragment, useCallback, useState, lazy } from 'react';
import {
    Typography,
    Card,
    CardMedia,
    Container,
    CardActionArea,
    Grid,
    Button, CardContent, IconButton, CardActions
} from '@material-ui/core';
import { IReducer, IState, IUser } from '../../../utils/Interface';
import { useSelector, useDispatch } from 'react-redux';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Components.
import Footer from '../../components/portfolio/Footer';
import Loading from '../../components/Loading';
import { fetchUserAction } from '../../../actions/AuthAction';
import { Link } from 'react-router-dom';


interface IHomeProps {
    classes: any
}

export const Home: FC<IHomeProps> = ({ classes }) => {
    const userData = useSelector<IState>((state: IState) => state?.user) as IUser[]
    const isLoading = useSelector<IState>((state: IState) => state?.isLoading) as boolean

    const dispatch = useDispatch();

    const fetchUserData = () => {
        dispatch(fetchUserAction(''))
    }

    React.useEffect(() => {
        fetchUserData();
    }, [])

    return isLoading ? <Loading /> : (
        <Fragment>
            <section className={classes.intro}>
                <Typography variant='h1' style={{ color: '#FF9001' }}>Welcome to <span style={{ color: '#FFF' }}>E&L</span></Typography>
                <Typography variant='h3' style={{ color: '#FFF' }}>Create Your Portfolio, and share it.</Typography>
            </section>
            <section className={classes.section2}>
                <Typography
                    variant='h2'
                    align='center'
                    className={classes.title}
                >
                    Partners
                </Typography>
                <div className={classes.grid} >
                    {
                        Array.isArray(userData) && userData?.slice(0, 4).map((user: IUser, i: number) => {
                            
                            return (
                                <Card key={i} className={classes.cards}>
                                    <CardMedia
                                        className={classes.medias}
                                        image={user.avatar as any}
                                        title='man'
                                    />
                                    <CardContent className={classes.content}>
                                        <Typography className={classes.username} gutterBottom variant="h4" component={Link} to={`/portfolio/${user.username}`}>
                                            {user.username}
                                        </Typography>
                                        <div style={{ display: 'flex', alignContent: 'center', margin: 1 }}>
                                            <FavoriteIcon />
                                            <Typography > 74K</Typography>
                                        </div>                                        
                                        <div style={{ display: 'flex', alignContent: 'center', margin: 1 }}>
                                            <ShareIcon />
                                            <Typography > 74K</Typography>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })
                    }
                </div>
            </section>
            <Footer />
        </Fragment>
    )
}