interface IRatingTable {
    img: string;
    alt: string;
    name: string;
    rating: number;
    vote_average: string;
}

export default function RatingTable({ rows }: { rows: IRatingTable[] }) {
    return (
        <table>
            <tbody>
                <tr>
                    <td> Site </td>
                    <td> Rating </td>
                    <td> People</td>
                </tr>
                {
                    rows.map((item, index) => {
                        return <tr>
                            <td key={index}>
                                <img src={item.img} alt={item.alt} />
                                <p>{item.name}</p>
                            </td>
                            <td>{item.rating}</td>
                            <td>{item.vote_average}</td>
                        </tr>

                    })
                }

            </tbody>

        </table >
    )
}