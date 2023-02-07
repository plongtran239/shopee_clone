import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createSearchParams, useNavigate } from 'react-router-dom';
import omit from 'lodash/omit';

import useQueryConfig from './useQueryConfig';
import { schema, Schema } from 'src/utils/rules';
import paths from 'src/constants/paths';

type FormData = Pick<Schema, 'name'>;

const nameSchema = schema.pick(['name']);

export default function useSearchProducts() {
    const queryConfig = useQueryConfig();

    const { register, handleSubmit } = useForm<FormData>({
        defaultValues: {
            name: ''
        },
        resolver: yupResolver(nameSchema)
    });
    const navigate = useNavigate();

    const onSubmitSearch = handleSubmit((data) => {
        const config = queryConfig.order
            ? omit(
                  {
                      ...queryConfig,
                      name: data.name
                  },
                  ['order', 'sort_by']
              )
            : {
                  ...queryConfig,
                  name: data.name
              };
        navigate({
            pathname: paths.home,
            search: createSearchParams(config).toString()
        });
    });
    return { onSubmitSearch, register };
}
