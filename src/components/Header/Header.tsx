import { useState } from 'react';
import { createStyles, Header, Group, ActionIcon, Container, Burger, rem, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBrandTwitter, IconBrandDiscord, IconBrandFacebook, IconSun, IconMoonStars } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
    header: {
        backgroundColor: window.localStorage.getItem("theme") === 'dark' ? "#1A1B1E" : "white",
        zIndex: 1,
        position: "fixed"
    },
    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: rem(56),

        [theme.fn.smallerThan('sm')]: {
            justifyContent: 'flex-start',
        },
    },

    links: {
        width: rem(260),

        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    social: {
        width: rem(260),

        [theme.fn.smallerThan('sm')]: {
            width: 'auto',
            marginLeft: 'auto',
        },
    },

    burger: {
        marginRight: theme.spacing.md,

        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: window.localStorage.getItem("theme") === 'dark' ? theme.colors.dark[0] : "#333",
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: window.localStorage.getItem("theme") === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor: window.localStorage.getItem("theme") === "dark" ? "#333" : "#eee",
            color: window.localStorage.getItem("theme") === "dark" ? "white" : "blue"
        },
    },
}));

export function HeaderMiddle() {
    const links: any = [
        {
            "link": "/about",
            "label": "Home"
        },
        {
            "link": "/learn",
            "label": "About"
        },
        {
            "link": "/pricing",
            "label": "Projects"
        }
    ]
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState(links[0].link);

    const { classes, cx } = useStyles();
    const [colorScheme, setColorScheme] = useState<any>();

    const theme: any = []

    const toggleColorScheme = (value: any) => {
        const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
        setColorScheme(nextColorScheme);
        theme.push(nextColorScheme)
    };


    const items = links.map((link: any) => (
        <a
            key={link.label}
            href={link.link}
            className={cx(classes.link, { [classes.linkActive]: active === link.link })}
            onClick={(event) => {
                event.preventDefault();
                setActive(link.link);
            }}
        >
            {link.label}
        </a>
    ));

    return (
        <Header height={56} mb={120} className={classes.header}>
            <Container className={classes.inner}>
                <Burger opened={opened} onClick={toggle} size="sm" className={classes.burger} />
                <Group className={classes.links} spacing={5}>
                    {items}
                </Group>

                <h1 className="brand">Hasib Al Rashid</h1>

                <Group spacing={0} className={classes.social} position="right" noWrap>
                    <ActionIcon size="lg">
                        <IconBrandTwitter color={"#00acee"} size="1.1rem" stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <IconBrandFacebook color={"#3b5998"} size="1.1rem" stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <IconBrandDiscord color={"#7289da"} size="1.1rem" stroke={1.5} />
                    </ActionIcon>
                    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
                            <ActionIcon
                                onClick={() => {
                                    // @ts-expect-error
                                    toggleColorScheme()
                                    window.localStorage.setItem("theme", theme[0])
                                }}
                                size="lg"
                                sx={(theme) => ({
                                    backgroundColor:
                                        theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                                    color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
                                })}
                            >
                                {colorScheme === 'dark' ? <IconSun size="1.2rem" /> : <IconMoonStars size="1.2rem" />}
                            </ActionIcon>
                        </MantineProvider>

                    </ColorSchemeProvider>
                </Group>
            </Container>
        </Header>
    );
}