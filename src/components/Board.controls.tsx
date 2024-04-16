type pBottomMenu = {
	handleMenu : () => void;
	handleRetry : () => void;
	winner : number,
};

export function BottomMenu({ handleMenu, handleRetry, winner } : pBottomMenu) {
	return (<aside className={`my-6 flex gap-2 justify-center`}>
			<button onClick={handleMenu} className='block p-2 w-32 border rounded hover:bg-hierarchy-0 hover:text-hierarchy-3 transition-colors cursor-pointer'>Menu</button>
			<button onClick={handleRetry} className={`block ${!winner && 'invisible'} p-2 w-32 border rounded hover:bg-hierarchy-0 hover:text-hierarchy-3 transition-colors cursor-pointer`}>Retry</button>
	</aside>)
}