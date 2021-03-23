// https://leetcode.com/problems/remove-duplicates-from-sorted-array/

function removeDuplicates(nums: number[]): number {
  const length = nums.length;

  if (length < 2) {
    return length;
  }

  if (nums[0] === nums[length - 1]) {
    nums.length = 1;
  } else {
    let currentUniqueElementIndex = 0;
    for (let i = 1; i < nums.length; i += 1) {
      if (nums[currentUniqueElementIndex] !== nums[i]) {
        currentUniqueElementIndex += 1;
        nums[currentUniqueElementIndex] = nums[i];
      }
    }

    nums.length = currentUniqueElementIndex + 1;
  }

  return nums.length;
}

const a = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4, 4, 4];
console.log(removeDuplicates(a), a);
