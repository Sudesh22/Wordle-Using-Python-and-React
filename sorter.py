# import time

# words = []

# with open("abc.txt") as f:
#     for x in f:
#         words.append(str(x).strip("\n"))
#         words = set(words)
#         words = sorted(list(words))
# print(len(words))

# with open(r'words.txt', 'w') as fp:
#     for item in words:
#         # write each item on a new line
#         fp.write(str("%s," % item).lower())
#     print('Done')

# letters = ["a", "b", "c"]
# target_list = ["s", "b", "c"]
# print(set(letters[x] for x in list(o for o,v in enumerate(letters) if v == target_list[o])))
# print(set([letters.index(x) for x in letters if x in target_list]))

from Wordle import newWord

print(newWord())