import { useState } from 'react';
import { createStyles, Header, Group, ActionIcon, Container, Burger, rem, ColorSchemeProvider, MantineProvider, Drawer } from '@mantine/core';
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import { IconBrandTwitter, IconBrandDiscord, IconBrandFacebook, IconSun, IconMoonStars, IconBrandGithubFilled } from '@tabler/icons-react';
import useTarget from "use-target"

export function HeaderMiddle() {
    const links: any = [
        {
            "link": "home",
            "label": "Home"
        },
        {
            "link": "about",
            "label": "About"
        },
        {
            "link": "projects",
            "label": "Projects"
        },
        {
            "link": "contact",
            "label": "Contact"
        }
    ]
    const [opened, { open, close }] = useDisclosure(false);
    const [active, setActive] = useState(links[0].link);
    const handleClick = useTarget(active);

    const [colorScheme, setColorScheme] = useLocalStorage<any>({
        key: 'mantine-color-scheme',
        defaultValue: 'light',
        getInitialValueInEffect: true,
    });
    const useStyles = createStyles((theme) => ({
        header: {
            backgroundColor: colorScheme === 'dark' ? "#1A1B1E" : "white",
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
            width: rem(310),

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

        response: {
            display: "flex",

            [theme.fn.smallerThan('sm')]: {
                display: "none"
            }
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
            color: colorScheme === 'dark' ? theme.colors.dark[0] : "#333",
            fontSize: theme.fontSizes.sm,
            fontWeight: 500,

            '&:hover': {
                backgroundColor: colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            },
        },

        linkActive: {
            '&, &:hover': {
                backgroundColor: colorScheme === "dark" ? "#333" : "#eee",
                color: colorScheme === "dark" ? "white" : "blue"
            },
        },
    }));

    const { classes, cx } = useStyles();
    const toggleColorScheme = (value?: any) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    const items = links.map((link: any) => (
        <a
            key={link.label}
            href="/"
            className={cx(classes.link, { [classes.linkActive]: active === link.link })}
            onClickCapture={close}
            onClick={(event) => {
                if (window.location.pathname != "/") {
                    window.location.href = "/"

                    event.preventDefault();
                    return handleClick
                }
                event.preventDefault();

                setActive(link.link);
                return handleClick
            }}
        >
            {link.label}
        </a>
    ));

    return (
        <Header height={56} mb={120} className={classes.header}>
            <Container className={classes.inner}>
                <Drawer
                    opened={opened}
                    onClose={close}
                    title="Hasib Al Rashid"
                    overlayProps={{ opacity: 0.5, blur: 4 }}
                >
                    {items}
                </Drawer>

                <Burger opened={opened} onClick={open} size="sm" className={classes.burger} />
                <Group className={classes.links} spacing={5}>
                    {items}
                </Group>

                <a style={{ textDecoration: "none" }} href="/">
                    <h1 style={{ color: `${colorScheme === "dark" ? "white" : "black"}` }} className="brand">Hasib Al Rashid</h1>
                </a>
                <Group spacing={0} className={classes.social || "social"} position="right" noWrap>
                    <div className={classes.response}>
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
                    </div>
                    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
                            <ActionIcon
                                onClick={() => {
                                    toggleColorScheme()
                                }}
                                size="lg"
                                sx={(theme) => ({
                                    backgroundColor:
                                        colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                                    color: colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
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