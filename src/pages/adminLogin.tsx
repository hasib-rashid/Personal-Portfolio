import { useLocalStorage } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Paper,
    Group,
    PaperProps,
    Button,
    Stack,
    ColorSchemeProvider,
    MantineProvider,
    createStyles,
    rem,
    Title,
} from '@mantine/core';
import { supabase } from "@/utils"

export default function AdminLogin(props: PaperProps) {
    // @ts-ignore
    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
            terms: true,
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
        },
    });

    const useStyles = createStyles((theme) => ({
        wrapper: {
            minHeight: rem(900),
            backgroundSize: 'cover',
            backgroundImage:
                'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
        },

        form: {
            borderRight: `${rem(1)} solid ${theme.colors.dark[7]}`,
            minHeight: rem(900),
            maxWidth: rem(450),
            paddingTop: rem(80),

            [theme.fn.smallerThan('sm')]: {
                maxWidth: '100%',
            },
        },

        title: {
            color: theme.white,
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        },
    }));
    // @ts-ignore
    const [colorScheme, toggleColorScheme] = useLocalStorage({
        key: 'mantine-color-scheme',
        defaultValue: 'light',
        getInitialValueInEffect: true,
    });
    // @ts-ignore
    const { classes } = useStyles();

    const handleLogin = async () => {
        console.log(form.values)
        const { data, error } = await supabase.auth.signInWithPassword({
            email: form.values.email,
            password: form.values.password,
        })
        if (error) {
            console.error('Error signing in:', error.message);
            alert("Password is incorrect")
        } else {
            console.log('User:', data);
            localStorage.setItem("supabaseSession", data.session.access_token)
            window.location.href = "/dashboard"
        }
    };

    return (
        // @ts-ignore
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            {/* @ts-ignore */}
            <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
                <div className={classes.wrapper}>
                    <Paper className={classes.form} radius={0} p={30}>
                        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
                            Dashboard
                        </Title>

                        <form onSubmit={form.onSubmit(handleLogin)}>
                            <Stack>
                                <TextInput
                                    required
                                    label="Email"
                                    placeholder="hello@mantine.dev"
                                    value={form.values.email}
                                    onChange={(event) => {
                                        form.setFieldValue('email', event.currentTarget.value)
                                    }}
                                    error={form.errors.email && 'Invalid email'}
                                    radius="md"
                                />

                                <PasswordInput
                                    required
                                    label="Password"
                                    placeholder="Your password"
                                    value={form.values.password}
                                    onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                                    error={form.errors.password && 'Password should include at least 6 characters'}
                                    radius="md"
                                />
                            </Stack>

                            <Group position="apart" mt="xl">
                                <Button type="submit" radius="xl">
                                    Login
                                </Button>
                            </Group>
                        </form>
                    </Paper>
                </div>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}