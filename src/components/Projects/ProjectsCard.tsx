import { createStyles, Image, Card, Text, Group, Button, getStylesRef, rem } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

const useStyles = createStyles(() => ({
    carousel: {
        '&:hover': {
            [`& .${getStylesRef('carouselControls')}`]: {
                opacity: 1,
            },
        },
    },

    carouselControls: {
        ref: getStylesRef('carouselControls'),
        transition: 'opacity 150ms ease',
        opacity: 0,
    },

    carouselIndicator: {
        width: rem(4),
        height: rem(4),
        transition: 'width 250ms ease',

        '&[data-active]': {
            width: rem(16),
        },
    },
}));

interface ProjectCard {
    allImages: any,
    projectTitle: any,
    projectDescription: any
    projectSource: any,
    projectDemo: any,
    dateCreated: any,
    data: any
}

export default function ProjectsCard({ data, allImages, projectTitle, projectDescription, projectSource, projectDemo, dateCreated }: ProjectCard) {
    const { classes } = useStyles();

    const slides = allImages.map((image: any) => (
        <Carousel.Slide key={image}>
            <Image onClick={(e) => {
                e.stopPropagation();
            }} src={image} height={220} />
        </Carousel.Slide>
    ));

    return (
        <Card style={{ width: "400px", height: "440px", position: "relative" }} radius="md" withBorder padding="xl">
            <Card.Section>
                <Carousel
                    withIndicators
                    loop
                    classNames={{
                        root: classes.carousel,
                        controls: classes.carouselControls,
                        indicator: classes.carouselIndicator,
                    }}
                >
                    {slides}
                </Carousel>
            </Card.Section>



            <Group position="apart" mt="lg">
                <Text fw={500} fz="lg">
                    {projectTitle}
                </Text>
                <Text fw={700} fz="sm">
                    {dateCreated}
                </Text>
            </Group>

            <Text fz="sm" c="dimmed" mt="sm">
                {projectDescription}
            </Text>

            <Group position="apart" mt="md" style={{ position: "absolute", right: "10px", bottom: "10px" }}>
                <Button onClick={(e) => {
                    window.location.href = projectDemo
                }} radius="md">Demo</Button>
                <Button onClick={() => {
                    window.location.href = projectSource
                }} radius="md">Source Code</Button>
            </Group>
        </Card>
    );
}