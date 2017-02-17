export class InMemoryDataService {
  createDb() {
    let tasks = [
	{
		id: 1,
		title: 'Finish Assignment',
		description: 'Spend 4 hours solving the last 2 problems.',
		due: '2016-11-12'
	},
	{
		id: 2,
		title: 'Study for Final',
		description: 'Spend the weekend studying Chapters 10, 15, 23',
		due: '2016-11-19'
	},
	{
		id: 3,
		title: 'Delete Tinder',
		description: 'Tinder is a horrible app, delete it as soon as possible!',
		due: '2016-11-05'
	},
	{
		id: 4,
		title: 'Meet Parents',
		description: 'Mom wants me do to Dinner with family.',
		due: '2016-11-26'
	},
	{
		id: 5,
		title: 'Meet Friends at Park',
		description: 'Meet friends in a park. Call Eric to find out which Park.',
		due: '2016-11-27'
	}
];
    return { tasks };
  }
}
