// import React, { useState } from 'react';
// import Form from 'react-bootstrap/Form';
// import useAppSelector from '../../../../../shared/hooks/useAppSelector';
// import useAppDispatch from '../../../../../shared/hooks/useAppDispatch';

// import styles from './brands.module.scss';
// import { setActiveBrands } from '../../../../../store/reducers/filtersSlice';
// import Button from '../../../../../shared/ui/Button/Button';

// interface BrandsProps {
//   brands: string[];
// }

// const Brands: React.FC<BrandsProps> = (props: BrandsProps) => {
//   const { brands } = props;

//   const dispatch = useAppDispatch();
//   const activeBrands = useAppSelector(
//     (state) => state.filtersReducer.activeBrands,
//   );

//   const [selectedBrands, setSelectedBrands] = useState<string[]>(activeBrands);

//   const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const brandName = event.target.value;
//     if (selectedBrands.includes(brandName)) {
//       setSelectedBrands(selectedBrands.filter((name) => name !== brandName));
//     } else {
//       setSelectedBrands([...selectedBrands, brandName]);
//     }
//   };

//   const handleApplyBrands = () => {
//     dispatch(setActiveBrands(selectedBrands));
//   };

//   return (
//     <div className={styles.brands}>
//       <div className={styles.brands_title}>Brands</div>
//       {brands.length > 0 ? (
//         <>
//           <Form className={styles.brands_list}>
//             {brands.map((brand) => (
//               <Form.Check
//                 className={styles.brand}
//                 type="checkbox"
//                 key={brand}
//                 value={brand}
//                 id={`${brand}`}
//                 label={`${brand}`}
//                 checked={selectedBrands.includes(brand)}
//                 onChange={handleCheckboxChange}
//               />
//             ))}
//           </Form>
//           <Button
//             className={styles.apply_btn}
//             value="Apply"
//             color="green"
//             onClick={handleApplyBrands}
//           />
//         </>
//       ) : (
//         <p className={styles.noBrands_message}>No matching brands found.</p>
//       )}
//     </div>
//   );
// };

// export default Brands;
