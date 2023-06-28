import { createStyles, Container, Group, ActionIcon, rem } from '@mantine/core';
import { IconBrandDiscord, IconBrandGithubFilled } from '@tabler/icons-react';
import { IconBrandTwitter, IconBrandFacebook } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
    footer: {
        marginTop: rem(20),
        borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
            }`,
    },

    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,

        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'column',
        },
    },

    links: {
        [theme.fn.smallerThan('xs')]: {
            marginTop: theme.spacing.md,
        },
    },
}));

export default function Footer() {
    const { classes } = useStyles();

    return (
        <div className={classes.footer}>
            <Container className={classes.inner}>
                <h1 style={{ fontFamily: "Lobster, cursive", fontWeight: 300, fontSize: "40px" }}>Hasib Al Rashid</h1>
                <Group spacing={0} className={classes.links} position="right" noWrap>
                    <ActionIcon size="lg">
                        <IconBrandTwitter color={"#00acee"} size="1.1rem" stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <IconBrandFacebook color={"#3b5998"} size="1.1rem" stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <IconBrandDiscord color={"#7289da"} size="1.1rem" stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <IconBrandGithubFilled color={"#171515"} size="1.1rem" stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Container>
        </div>
    );
}