import { TextInput, Textarea, SimpleGrid, Group, Title, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactMe() {
    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            subject: '',
            message: '',
        },
        validate: {
            name: (value) => value.trim().length < 2,
            email: (value) => !/^\S+@\S+$/.test(value),
            subject: (value) => value.trim().length === 0,
        },
    });

    const formic: any = useRef();

    const sendEmail = (e: any) => {
        emailjs
            .sendForm('service_ikdx85z', 'template_c6qaxfe', formic.current, {
                publicKey: 'YQKc5IhroK7mabwwM',
            })
            .then(
                (res) => {
                    console.log(res);
                },
                (error) => {
                    console.log('FAILED...', error);
                },
            );
    };

    return (
        <form ref={formic} style={{ margin: "auto", padding: "70px 0", width: "70vw" }} onSubmit={sendEmail}>
            <Title
                order={2}
                size="h1"
                sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}` })}
                weight={900}
                align="center"
            >
                Get in touch
            </Title>

            <SimpleGrid cols={2} mt="xl" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                <TextInput
                    label="Name"
                    placeholder="Your name"
                    name="name"
                    variant="filled"
                    {...form.getInputProps('name')}
                />
                <TextInput
                    label="Email"
                    placeholder="Your email"
                    name="email"
                    variant="filled"
                    {...form.getInputProps('email')}
                />
            </SimpleGrid>

            <TextInput
                label="Subject"
                placeholder="Subject"
                mt="md"
                name="subject"
                variant="filled"
                {...form.getInputProps('subject')}
            />
            <Textarea
                mt="md"
                label="Message"
                placeholder="Your message"
                maxRows={10}
                minRows={5}
                autosize
                name="message"
                variant="filled"
                {...form.getInputProps('message')}
            />

            <Group position="center" mt="xl">
                <Button type="submit" size="md">
                    Send message
                </Button>
            </Group>
        </form>
    );
}