import { X } from "lucide-react";

export default function CreateWatchListPopup({ setStateToFalse }: { setStateToFalse: (event: React.MouseEvent<HTMLButtonElement>) => void }) {
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted');
    }
    return (
        <div className="add-to-list-popup popup-modal flex create-list-popup">
            <main>
                <button className='close-btn' onClick={setStateToFalse} title='Close'>
                    <X />
                </button>
                <h3>Create new watchlist</h3>
                <form action="post" onSubmit={handleSubmit} className='flex fd-column'>
                    <label htmlFor="watch-title">Watchlist Name</label>
                    <input type="text" id='watch-title' placeholder='Enter watchlist name' />
                    <label htmlFor="watch-title">Status</label>
                    <select name="status" id="status">
                        <option value="Watching">Watching</option>
                        <option value="Completed">Completed</option>
                        <option value="Planning">Planning</option>
                        <option value="Public Lists">Public Lists</option>
                    </select>
                    <div className="btm-action-btns">
                        <button className="cursor-pointer flex algin-items-cen cancel-btn" onClick={setStateToFalse} title='Close'>Cancel</button>
                        <button className="cursor-pointer flex algin-items-cen fill-btn" type='submit' title='Create'>Create Watchlist</button>
                    </div>
                </form>
            </main>
        </div>
    );
}