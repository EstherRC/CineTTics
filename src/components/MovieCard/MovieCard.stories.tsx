import { Meta, StoryFn } from '@storybook/react';
import { IMovieCard } from './types';
import MovieCard from './MovieCard';

const meta: Meta = {
    title: 'Components/MovieCard',
    component: MovieCard,
    parameters: {
        layout: 'centered',
        docs: {
            story: {
                inline: false,
                description: 'A MovieCard component',
                iFrameHeight: 400,
            },
        },
    },
    argTypes: {
        title: { control: 'text' },
        genreId: { control: 'number' },
        movieId: { control: 'number' },
        voteAverage: { control: 'number' },
        posterPath: { control: 'text' },
    },
};

export default meta;

const Template: StoryFn<IMovieCard> = (args) => <MovieCard {...args} />;

export const Default = Template.bind({});
Default.args = {
    posterPath: 'https://image.tmdb.org/t/p/w500//u5nY7pY2Y58o7dSM9cy6NclOV8V.jpg',
    title: 'Cocaine Bear',
    genreId: 53,
    movieId: 804150,
    voteAverage: 6.5,
};
