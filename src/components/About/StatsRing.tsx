import { RingProgress, Text, SimpleGrid, Paper, Center, Group } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { IconArrowUpRight, IconArrowDownRight, IconBrandJavascript, IconBrandCss3, IconBrandReact } from '@tabler/icons-react';

const icons = {
    up: IconArrowUpRight,
    down: IconArrowDownRight,
    javascript: IconBrandJavascript,
    css: IconBrandCss3,
    react: IconBrandReact
};

export default function StatsRing() {
    const data: any = [
        {
            "label": "Language",
            "stats": "Javascript",
            "progress": 100,
            "color": "yellow",
            "icon": "javascript"
        },
        {
            "label": "Designing",
            "stats": "CSS",
            "progress": 100,
            "color": "blue",
            "icon": "css"
        },
        {
            "label": "Framework",
            "stats": "ReactJS",
            "progress": 100,
            "color": "green",
            "icon": "react"
        }
    ]
    const [colorScheme] = useLocalStorage<any>({
        key: 'mantine-color-scheme',
        defaultValue: 'light',
        getInitialValueInEffect: true,
    });
    const stats = data.map((stat: any) => {

        // @ts-expect-error
        const Icon = icons[stat.icon];

        return (
            <Paper withBorder radius="md" p="xs" key={stat.label} style={{ backgroundColor: `${colorScheme === "dark" ? "#1A1B1E" : "white"}` }}>
                <Group>
                    <RingProgress
                        size={80}
                        roundCaps
                        thickness={8}
                        sections={[{ value: stat.progress, color: stat.color }]}
                        label={
                            <Center>
                                <Icon size="1.4rem" stroke={1.5} />
                            </Center>
                        }
                    />

                    <div>
                        <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
                            {stat.label}
                        </Text>
                        <Text weight={700} size="xl">
                            {stat.stats}
                        </Text>
                    </div>
                </Group>
            </Paper>
        );
    });

    return (
        <SimpleGrid className='statsring' style={{ flexDirection: "column" }}>
            {stats}
        </SimpleGrid>
    );
}