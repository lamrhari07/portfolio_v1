import React, { FC, Fragment} from 'react';
import {
    Theme,
    makeStyles,
    createStyles,
    Typography,
    Box,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import { IProject } from '../../../utils/Interface';


// Define Layout component interface; 
interface IntroProps {
    projects: any
}

const ProjectSection: FC<IntroProps> = ({ projects }) => {
    const classes = useStyles();

    return (
        <Fragment>
            <Box className={classes.grid}>
                {
                    projects?.map((project: IProject, i: number) => {
                        return (
                            <Card key={i} className={classes.card}>
                                <CardMedia
                                    className={classes.media}
                                    image="https://cnpagencykeycdn-75c5.kxcdn.com/wp-content/uploads/python.sh-600x600.png"
                                    title="Paella dish"
                                />
                                <CardContent>
                                    <Typography variant="h4" align='center' style={{ maxWidth:200, marginBottom: 5 }} noWrap>
                                        {project?.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        This impressive paella is a perfect party dish and a fun meal to cook together with your
                                        guests. Add 1 cup of frozen peas along with the mussels, if you like.
                            </Typography>
                                </CardContent>
                                <CardActions className={classes.icon}>
                                    <Button variant="contained" color="primary" href={project?.git_url}>
                                        GitHub &nbsp; <GitHubIcon />
                                    </Button>
                                </CardActions>
                            </Card>
                        )
                    })
                }
            </Box>
        </Fragment >
    )
}



// Init Style;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grid: {
            display: 'grid',
            gridGap: '1.7rem',
            gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
        },
        card: {
            margin: '0 auto',
            width: 'auto',

        },
        media: {
            margin: '0 auto',
            width: 200,
            height: 200
        },
        icon: {
            float: 'right',
            marginTop: -15,
        }
    })
)

export default ProjectSection;