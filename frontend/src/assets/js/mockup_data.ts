import { IWatchList } from "./myTypes";

export const mockWatchLists: IWatchList[] = [
    {
        _id: 'a1',
        title: 'Top Sci-Fi Thrillers',
        desc: 'Mind-bending science fiction movies that keep you thinking.',
        length: 12,
        status: ['Watching'],
        duration: 120,
    },
    {
        _id: 'b2',
        title: 'Feel-Good Romcoms',
        desc: 'Romantic comedies perfect for a weekend binge.',
        length: 8,
        status: ['Completed'],
        duration: 90, // in minutes
    },
    {
        _id: 'c3',
        title: 'Animated Favorites',
        desc: 'Family-friendly animated films everyone loves.',
        length: 15,
        status: ['Planning'],
        duration: 100, // in minutes
    },
    {
        _id: 'd4',
        title: 'Gripping Documentaries',
        desc: 'Real stories told with impact.',
        length: 7,
        status: ['Watching'],
        duration: 300
    },
    {
        _id: 'e5',
        title: 'Foreign Language Gems',
        desc: 'Beautiful stories from across the globe.',
        length: 10,
        status: ['Completed', 'Public Lists'],
    },
    {
        _id: 'f6',
        title: 'Underrated Masterpieces',
        desc: '',
        length: 5,
        status: ['Watching'],
        duration: 150, // in minutes
    },
    {
        _id: 'g7',
        title: 'Weekend Horror Marathon',
        desc: 'Only for the brave. Creepy, intense, unforgettable.',
        length: 9,
        status: ['Completed'],
        duration: 180, // in minutes
    },
    {
        _id: 'h8',
        title: 'Historical Epics',
        desc: 'Long-form films based on real events or settings.',
        length: 6,
        status: ['Planning'],
        duration: 240, // in minutes
    },
    {
        _id: 'i9',
        title: 'Award-Winning Films',
        desc: 'Movies that took home the big trophies.',
        length: 14,
        status: ['Completed'],
        duration: 400
    },
    {
        _id: 'j10',
        title: 'Chill & Cozy Movies',
        desc: 'Low-stakes stories for winding down.',
        length: 11,
        status: ['Watching'],
        duration: 100
    },
]


// [
//     { _id: '1', title: 'Best Movies', desc: 'This is the first list', length: 5, status: ['Watching'] },
//     { _id: '23e3e323e', title: 'Top 19 Movies', desc: 'This is the second list', length: 10, status: ['Completed'] },
//     { _id: '33rrr', title: 'Movies to Watch', desc: '', length: 3, status: ['Watching'] },
//     { _id: '4lwj4', title: "My Favorite Movies", desc: 'A list of my favorite movies', length: 8, status: ['Watching'] },
//     { _id: '53r3r3r', title: 'Action Movies', desc: 'A list of action movies', length: 12, status: ['Planning',] },
//     { _id: '6jyj5yr43', title: 'Comedy Movies', desc: '', length: 7, status: ['Watching'] },
//     { _id: '7ff2gr4', title: 'Drama Movies', desc: 'A list of drama movies', length: 4, status: ['Public Lists', 'Completed'] },
//     { _id: '8ny4wa35', title: 'Sci-Fi Movies', desc: 'Some long description of the list that is not too long', length: 6, status: ['Completed'] },
//     { _id: '9j6876', title: 'Horror Movies', desc: '', length: 9, status: ['Watching'] },
//     { _id: '14t4t20', title: 'Romantic Movies', desc: '', length: 11, status: ['Watching'] },
// ]
