document.addEventListener("DOMContentLoaded", function () {
	let savedData = localStorage.getItem("data")
	if (savedData !== undefined && savedData !== null) {
		var saveData = JSON.parse(savedData)

		// deleteAll()
		createLoadData()
	} else {
		var saveData = []
		var maxContainer = 0
	}
	let buttAdd = document.querySelector(".add-word")
	let buttRemove = document.querySelector(".remove-word")
	let buttRandom = document.querySelector(".random")
	let toggleLeft = document.querySelector(".toggleLeft")
	let toggleRight = document.querySelector(".toggleRight")
	let clicked = false

	function saveDateObject(
		id,
		engWordData,
		rusWordData,
		positionData,
		containerNumberData,
		maxContainer
	) {
		let newData = {
			id: id,
			engWordData: engWordData,
			rusWordData: rusWordData,
			positionData: positionData,
			containerNumberData: containerNumberData,
			maxContainer: maxContainer,
		}
		saveData.push(newData)
	}

	function updateDate(i, randomIndex) {
		let currentItem = saveData[i]
		saveData[i] = saveData[randomIndex]
		saveData[randomIndex] = currentItem
		saverData()
	}

	function deleteAll() {
		saveData = []
		saverData()
	}

	function saverData() {
		localStorage.setItem("data", JSON.stringify(saveData))
	}
	function maxContainerData() {
		if (saveData.length > 1) {
			for (let how = 0; how < saveData.length - 1; how++) {
				saveData[how].maxContainer =
					saveData[saveData.length - 1].maxContainer
			}
		}
	}

	function createLoadData() {
		let length = saveData.length
		for (let n = 0; n < length; n++) {
			let newWordsContainer = document.createElement("div")
			let classCur = saveData[n].containerNumberData
			newWordsContainer.classList.add("newWordsContainer", `${classCur}`)
			let parentWordContainer = document.querySelector(".word-container")
			parentWordContainer.appendChild(newWordsContainer)

			newEngWordContainer = document.createElement("div")
			newRusWordContainer = document.createElement("div")

			newEngWordContainer.classList.add(
				"newEngWordContainer__style",
				`engWordContainer-${n}`
			)
			newRusWordContainer.classList.add(
				"newRusWordContainer__style",
				`ruWordContainer-${n}`
			)
			newWordsContainer.appendChild(newEngWordContainer)
			newWordsContainer.appendChild(newRusWordContainer)

			let engParent = document.querySelector(`.engWordContainer-${n}`)
			let rusParent = document.querySelector(`.ruWordContainer-${n}`)
			let newWordEng = document.createElement("p")
			let newWordRus = document.createElement("p")
			newWordEng.classList.add("eng-word")
			newWordRus.classList.add("rus-word", "words")
			newWordEng.textContent = saveData[n].engWordData
			newWordRus.textContent = saveData[n].rusWordData

			engParent.appendChild(newWordEng)
			rusParent.appendChild(newWordRus)
		}
	}

	buttAdd.addEventListener("click", function () {
		if (!clicked) {
			clicked = true
			let mainWindow = document.querySelector(".main")
			let newWindowsPhone = document.createElement("div")
			newWindowsPhone.classList.add("newWindowsPhone")

			mainWindow.appendChild(newWindowsPhone)
			let newWindowForm = document.createElement("form")
			newWindowForm.classList.add("newWindowForm")
			let newWindowPhone = document.querySelector(".newWindowsPhone")
			newWindowPhone.appendChild(newWindowForm)

			let inputsContainer = document.createElement("div")
			inputsContainer.classList.add("inputsContainer")
			newWindowForm.appendChild(inputsContainer)

			let engWordInputContainer = document.createElement("div")
			engWordInputContainer.classList.add(
				"engWordInputContainer",
				"wordsInputContainer"
			)

			let rusWordInputContainer = document.createElement("div")
			rusWordInputContainer.classList.add(
				"rusWordInputContainer",
				"wordsInputContainer"
			)

			inputsContainer.append(engWordInputContainer, rusWordInputContainer)

			let maxLength = 25
			let engWordInput = document.createElement("input")
			engWordInput.classList.add("engWordInput")
			engWordInputContainer.append(engWordInput)
			engWordInput.setAttribute("maxlength", maxLength)
			engWordInput.setAttribute("placeholder", "Введите английское слово")
			engWordInput.addEventListener("input", function (event) {
				let engInputValue = event.target.value
				let englishLetters = /^[A-Za-z]+$/
				if (!engInputValue.match(englishLetters)) {
					event.target.value = engInputValue.replace(
						/[^A-Za-z]+/g,
						""
					)
				}
			})

			let rusWordInput = document.createElement("input")
			rusWordInput.classList.add("rusWordInput")
			rusWordInputContainer.append(rusWordInput)
			rusWordInput.setAttribute("maxlength", maxLength)
			rusWordInput.setAttribute("placeholder", "Введите русское слово")
			rusWordInput.addEventListener("input", function (event) {
				let rusInputValue = event.target.value
				let russianLetters = /^[А-Яа-я]+$/
				if (!rusInputValue.match(russianLetters)) {
					event.target.value = rusInputValue.replace(
						/[^А-Яа-я]+/g,
						""
					)
				}
			})

			let btnContainer = document.createElement("div")
			btnContainer.classList.add("btnContainer")
			newWindowForm.appendChild(btnContainer)
			let btnOk = document.createElement("button")
			btnOk.classList.add("btnOk", "btnForm")
			btnOk.textContent = "Ok"
			let btnNo = document.createElement("button")
			btnNo.classList.add("btnNo", "btnForm")
			btnNo.textContent = "X"
			btnContainer.append(btnOk, btnNo)

			function createElements(cur) {
				let newWordsContainer = document.createElement("div")
				let parentWordContainer =
					document.querySelector(".word-container")
				parentWordContainer.appendChild(newWordsContainer)
				newWordsContainer.classList.add(
					`newWordsContainer-${cur}`,
					"newWordsContainer"
				)

				let newEngWordContainer = document.createElement("div")
				let newRusWordContainer = document.createElement("div")

				newEngWordContainer.classList.add(
					"newEngWordContainer__style",
					`engWordContainer-${cur}`
				)
				newRusWordContainer.classList.add(
					"newRusWordContainer__style",
					`ruWordContainer-${cur}`
				)
				newWordsContainer.appendChild(newEngWordContainer)
				newWordsContainer.appendChild(newRusWordContainer)

				let engParent = document.querySelector(
					`.engWordContainer-${cur}`
				)
				let rusParent = document.querySelector(
					`.ruWordContainer-${cur}`
				)
				let newWordEng = document.createElement("p")
				let newWordRus = document.createElement("p")
				newWordEng.classList.add("eng-word")
				newWordRus.classList.add("rus-word", "words")

				let eng = engWordInput.value

				let engUP = eng.charAt(0).toUpperCase()
				let newEng
				if (eng.length > 1) {
					for (let i = 1; i < eng.length; i++) {
						if (i == 1) newEng = engUP
						newEng = newEng + eng[i]
					}
				} else newEng = engUP

				let rus = rusWordInput.value

				let rusUP = rus.charAt(0).toUpperCase()
				let newRus
				if (rus.length > 1) {
					for (let i = 1; i < rus.length; i++) {
						if (i == 1) newRus = rusUP
						newRus = newRus + rus[i]
					}
				} else newRus = rusUP

				newWordEng.textContent = newEng
				newWordRus.textContent = newRus

				engParent.appendChild(newWordEng)
				rusParent.appendChild(newWordRus)
				let operrationComplete =
					document.querySelector(".newWindowForm")
				operrationComplete.remove()
				let operrationCompletePhone =
					document.querySelector(".newWindowsPhone")
				operrationCompletePhone.remove()
				saveDateObject(
					parseInt(cur),
					newEng,
					newRus,
					parseInt(cur),
					`newWordsContainer-${cur}`,
					parseInt(cur + 1)
				)
			}

			btnOk.addEventListener("click", function (event) {
				event.preventDefault()

				if (engWordInput.value === "" || rusWordInput.value === "") {
				} else {
					clicked = false
					if (saveData.length == 0) {
						createElements(0)
						saverData()
					} else {
						let curLength = saveData.length
						let newPosition = -1

						for (let k = 0; k < curLength; k++) {
							if (
								!saveData.some(
									(item) => item.positionData === k
								)
							) {
								newPosition = k
								break
							}
						}

						if (newPosition !== -1) {
							createElements(newPosition)
							saverData()
						} else {
							newPosition = saveData.length
							createElements(newPosition)
							saverData()
						}
					}
				}
			})

			btnNo.addEventListener("click", function () {
				let newWindowRemove = document.querySelector(".newWindowForm")
				newWindowRemove.remove()
				let newWindowPhone = document.querySelector(".newWindowsPhone")
				newWindowPhone.remove()
				clicked = false
			})
		}
	})
	buttRemove.addEventListener("click", function () {
		if (!clicked) {
			if (saveData.length > 0) {
				let containerToDel =
					saveData[saveData.length - 1].containerNumberData
				let removeElement = document.querySelector(`.${containerToDel}`)
				removeElement.remove()
				saveData.pop()
				if (saveData.length == 0) maxContainer = 0
				saverData()
			}
		}
	})
	buttRandom.addEventListener("click", function (event) {
		if (!clicked) {
			if (saveData.length > 1) {
				event.preventDefault()
				maxContainerData()
				let parentElement = document.querySelector(".word-container")
				let elements = Array.from(parentElement.children)
				for (let i = 0; i < elements.length; i++) {
					let randomIndex = Math.floor(Math.random() * (i + 1))
					;[elements[i], elements[randomIndex]] = [
						elements[randomIndex],
						elements[i],
					]

					updateDate(i, randomIndex)
				}

				while (parentElement.firstChild) {
					parentElement.removeChild(parentElement.firstChild)
				}

				for (let element of elements) {
					parentElement.appendChild(element)
				}
				saverData()
			}
		}
	})

	toggleLeft.addEventListener("click", function (event) {
		if (!clicked) {
			if (saveData.length > 0) {
				for (let i = 0; i < saveData.length; i++) {
					let haveClassRu = document.querySelector(
						`.ruWordContainer-${i}`
					)
					let toggleLeftBtn = document.querySelector(
						`.engWordContainer-${i}`
					)
					if (!haveClassRu.classList.contains("hidden")) {
						toggleLeftBtn.classList.toggle("hidden")
					}
				}
			}
		}
	})
	toggleRight.addEventListener("click", function (event) {
		if (!clicked) {
			if (saveData.length > 0) {
				for (let i = 0; i < saveData.length; i++) {
					let haveClassEng = document.querySelector(
						`.engWordContainer-${i}`
					)
					let toggleRightBtn = document.querySelector(
						`.ruWordContainer-${i}`
					)
					if (!haveClassEng.classList.contains("hidden"))
						toggleRightBtn.classList.toggle("hidden")
				}
			}
		}
	})
})
