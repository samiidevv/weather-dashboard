<script>
	import { Rainy1, Rainy2, Windy } from '$lib';
	import { goto } from '$app/navigation';
	import { setName } from '$lib';
	let name = $state('');
	let nameError = $state('');

	const validate = () => {
		if (!name) {
			nameError = 'Name Is Required';
		} else if (!/^[a-zA-Z\s]+$/.test(name)) {
			nameError = 'Only English Letters Are Allowed';
		} else if (name.length < 3) {
			nameError = 'Name Must Be At Least 3 Characters';
		} else {
			nameError = '';
		}
	};

	const handleLogin = () => {
		validate();
		if (!nameError) {
			setName(name);
			goto('/dashboard');
		}
	};
</script>

<div class="flex h-screen items-center justify-center bg-blue-50">
	<div class="flex h-[60%] w-[70%] overflow-hidden rounded-2xl shadow-[0_4px_8px_rgba(0,0,0,0.2)]">
		<div class="flex flex-1/2 items-center justify-center bg-white">
			<div class="w-[80%]">
				<h1 class="mb-8 text-center text-4xl font-bold">Login</h1>

				<div class="flex flex-col gap-48">
					<div>
						<input
							bind:value={name}
							type="text"
							placeholder="Enter Your Name"
							class="w-full rounded-lg border {nameError
								? 'border-red-500 focus:ring-red-500'
								: 'border-gray-300 focus:ring-blue-300'} focus:ring-blue-300 focus:outline-none"
							oninput={validate}
						/>
						{#if nameError}
							<p class="mt-2 ml-1 text-red-500">{nameError}</p>
						{/if}
					</div>
					<button
						class="w-full rounded-lg bg-blue-500 p-2 text-white uppercase transition hover:bg-blue-700"
						onclick={handleLogin}>login</button
					>
				</div>
			</div>
		</div>
		<div class="flex-1/2 bg-blue-100">
			<div class="relative h-full">
				<img class="absolute -top-[6%] right-[2%] h-[50%] w-[50%]" src={Rainy1} alt="" />
				<img class="absolute top-[20%] left-[6%] h-[50%] w-[50%]" src={Rainy2} alt="" />
				<img class="absolute right-[2%] bottom-0 h-[50%] w-[50%]" src={Windy} alt="" />
			</div>
		</div>
	</div>
</div>
