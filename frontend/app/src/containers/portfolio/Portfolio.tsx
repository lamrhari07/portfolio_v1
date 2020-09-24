import React, { FC, Fragment, useCallback, useState, lazy, Suspense } from 'react';
import {
    Typography, Button,
} from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import { IState, IUser } from '../../../utils/Interface';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects } from '../../../actions';

// Components.
// import ProjectSection from '../../components/ProjectSection';
import IntroSection from '../../components/portfolio/IntorSection';
import Footer from '../../components/portfolio/Footer';
import Loading from '../../components/Loading';
import { fetchUserAction } from '../../../actions/AuthAction';
import ContactUsSection from '../../components/portfolio/ContactUsSection';


const ProjectSection = lazy(() => import('../../components/portfolio/ProjectSection'))

interface IPortfolioProps {
    classes?: any
    match?: RouteComponentProps | any
}

export const Portfolio: FC<IPortfolioProps> = ({ classes, match }) => {
    const userData = useSelector<IState>((state: IState) => state?.user) as IUser
    const isLoading = useSelector<IState>((state: IState) => state?.isLoading) as boolean

    const dispatch = useDispatch();

    const fetchUserData = useCallback(() => {
        dispatch(fetchUserAction('/'.concat(match?.params?.username)))
    }, [userData])

    React.useEffect(() => { 
        fetchUserData();
    }, [])

    return isLoading ? <Loading /> : (
        <Fragment>
            <section className={classes.intro}>
                <IntroSection userData={userData} />
            </section>
            <section className={classes.section1}>
                <Typography
                    variant='h4'
                    className={classes.discr}
                >
                    {userData.introduction}
                </Typography>
            </section>
            <section className={classes.section2}>
                <Typography
                    variant='h2'
                    className={classes.title}
                >
                    Projects
                </Typography>
                <Suspense fallback={<Loading />}>
                    <ProjectSection projects={userData?.projects?.slice(0, 6)} />
                </Suspense>
            </section>
            <section className={classes.footer}>
                <ContactUsSection />
                <Footer />
            </section>
        </Fragment>
    )
}