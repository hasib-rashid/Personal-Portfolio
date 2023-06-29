import React from 'react'
import { createStyles } from '@mantine/core'
import './HomePage.module.css'

const HomePage = () => {
    const useStyles = createStyles((theme) => ({
        shortText: {
            display: "flex",
            flexDirection: "column"
        },
        motto: {
            display: "flex",

            [theme.fn.smallerThan("sm")]: {
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            }
        }
    }))
    const { classes } = useStyles()

    return (
        <div className="HomePage">
            <h1>Hasib Al Rashid</h1>
            <div className={classes.motto}>
                <h4 className={classes.shortText}>FullStack Dev,&nbsp;</h4>
                <h4>Hobbyist,&nbsp;</h4>
                <h4>Student</h4>
            </div>
        </div>
    )
}

export default HomePage