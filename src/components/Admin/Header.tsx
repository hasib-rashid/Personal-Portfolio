import { useState } from 'react';
import { createStyles, Header, Group, ActionIcon, Container, Burger, rem, ColorSchemeProvider, MantineProvider, Drawer, Button } from '@mantine/core';
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import useTarget from "use-target"
import { supabase } from '@/utils';
import { useRouter } from 'next/navigation';

export default function AdminHeader() {
    const router = useRouter()
    const links: any = [
        {
            "link": "/",
            "label": "Dashboard"
        },
        {
            "link": "create",
            "label": "Create Project"
        },
        {
            "link": "edit",
            "label": "Edit Project"
        },
        {
            "link": "contacted",
            "label": "Contacted"
        }
    ]
    const [opened, { open, close }] = useDisclosure(false);
    const [active, setActive] = useState(links[0].link);
    const handleClick = useTarget(active);

    const [colorScheme, setColorScheme] = useLocalStorage<any>({
        key: 'mantine-color-scheme',
        defaultValue: 'dark',
        getInitialValueInEffect: true,
    });
    const useStyles = createStyles((theme) => ({
        header: {
            backgroundColor: colorScheme === 'dark' ? "#1A1B1E" : "white",
            zIndex: 1,
            position: "fixed",
            justifyContent: "space-between"
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
            width: rem(600),

            [theme.fn.smallerThan('sm')]: {
                display: 'none',
            },
        },

        social: {
            width: rem(260)
        },

        response: {
            display: "flex",

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
                event.preventDefault();
                router.push(`/dashboard/${link.link}`)
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
                <Group className={classes.links} spacing={3}>
                    {items}
                </Group>

                <h1 style={{ color: `${colorScheme === "dark" ? "white" : "black"}` }} className="brand">Dashboard</h1>

                <Group spacing={0} className={classes.social || "social"} position="right" noWrap>
                    <div className={classes.response}>
                        <Button onClick={() => {
                            supabase.auth.signOut()
                            localStorage.removeItem("supabaseSession")
                            router.push("/")
                        }}>Sign Out</Button>
                    </div>
                    &nbsp;
                    &nbsp;
                    &nbsp;
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